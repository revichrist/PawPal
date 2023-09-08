const { sendMail, cloudinary } = require("../helpers");
const { Pet, User, AdoptedPet } = require("../models");
const axios = require('axios')

class PetController {
  // (request, response, next)
  static async fetchReadyPet(request, response, next) {
    try {
      const {currentPage = 1} = request.query
      const limit = 3
      if (currentPage < 1) currentPage = 1;
      const offset = limit * (currentPage - 1);

      const data = await Pet.findAndCountAll({
        limit,
        offset,
        where: {
          status: "Ready",
        },
        order: [["id", "ASC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      response.status(200).json({
        totalPage: Math.ceil(data.count / limit),
        data: data.rows
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchPetDetail(request, response, next){
    try {
      const {id} = request.params
      
      const data = await Pet.findByPk(id, {
        include: {
          model: User,
          attributes: ['username']
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })

      if(!data) throw {name: 'DataNotFound'}

      response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async fetchAdminPet(request, response, next) {
    try {
      // only accepts Pending and Adopted status
      const { status } = request.query;

      const data = await Pet.findAll({
        where: {
          status,
        },
        order: [["id", "ASC"]],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async patchStatus(request, response, next) {
    try {
      const { id } = request.params;

      const petData = await Pet.findByPk(id);

      if (!petData) throw { name: "DataNotFound" };

      const patchStatus = await Pet.update(
        {
          status: "Ready",
        },
        {
          where: {
            id,
          },
        }
      );

      response.status(200).json({
        message: `${petData.name} is now ready to be adopted!`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async postPet(request, response, next) {
    try {
      if(!request.file) throw{name: 'PetImgRequired'}
      const { id: UserId, email, username } = request.user;
      const { mimetype:fileType, path: filePath } = request.file;
      
      const {
        name,
        type,
        gender,
        weight,
        isNeutered,
        description,
        age,
      } = request.body;

      if(!name) throw {name: 'PetNameRequired'} 
      if(!type) throw {name: 'PetTypeRequired'}
      if(!gender) throw {name: 'PetGenderRequired'}
      
      const uploadData = await cloudinary.uploader.upload(filePath)

      const imageUrl = uploadData.secure_url
      
      const data = await Pet.create({
        name,
        type,
        gender,
        imageUrl,
        weight,
        isNeutered,
        description,
        age,
        UserId,
      });

      const payload = {
        email,
        username,
        petName: data.name,
      };

      sendMail(payload, "Pending");

      response.status(201).json({
        message: `${data.name} will now be in queue to be approved`,
      });

      
    } catch (error) {
      next(error);
    }
  }

  static async deletePet(request, response, next) {
    try {
      const { id } = request.params;

      const petData = await Pet.findOne({
        where: {
          id,
        },
        include: {
          model: User,
          attributes: ["username", "email"],
        },
      });

      if (!petData) throw { name: "DataNotFound" };

      const petName = petData.name;
      const petId = petData.id;

      const payload = {
        email: petData.User.email,
        username: petData.User.username,
        petName,
      };

      sendMail(payload, "Rejected");

      await Pet.destroy({
        where: {
          id,
        },
      });

      response.status(200).json({
        message: `${petName} with ID:${petId} has been removed`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async adoptPet(request, response, next) {
    try {
      const { petId } = request.params;
      const { id: UserId, email, username } = request.user;
      const petData = await Pet.findByPk(petId, {
        include: {
          model: User,
          attributes: ["id", "username", "email"],
        },
      });

      if (!petData) throw { name: "DataNotFound" };

      // kalo id submitternya yang login sama (alias: submitter ngeadopt petnya sendiri)
      const submitterId = petData.User.id;
      if (submitterId === UserId) throw { name: "AdoptError" };

      await AdoptedPet.create({
        PetId: petData.id,
        UserId,
      });

      await Pet.update(
        {
          status: "Adopted",
        },
        {
          where: {
            id: petId,
          },
        }
      );

      const payload = {
        email,
        username,
        petName: petData.name,
        petGender: petData.gender,
      };

      sendMail(payload, "Adopted");

      response.status(201).json({
        message: `${petData.name} was adopted`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchRandomDogFact(request, response, next){
    try {
      const {data} = await axios({
        method: 'GET',
        url: 'http://dog-api.kinduff.com/api/facts'
      })

      const [fact] = data.facts
      
      response.status(200).json(fact)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = PetController;
