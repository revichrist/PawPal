function errorHandler(error, request, response, next) {
  let message = error.name;
  let statusCode = 500;
  console.log(error.name, 4);
  console.log(error, 5);

  switch (error.name) {
    case "PetImgRequired":
      message = "Pet image is required";
      statusCode = 400;
      break;

      case "PetNameRequired":
      message = "Pet name is required";
      statusCode = 400;
      break;

      case "PetTypeRequired":
      message = "Pet type is required";
      statusCode = 400;
      break;

      case "PetGenderRequired":
      message = "Pet gender is required";
      statusCode = 400;
      break;
    
    case "GoogleTokenError":
      statusCode = 401;
      message = "There's an error when fetching user's token";
      break;

    case "AdoptError":
      message = "You cannot adopt your own submitted pet!";
      statusCode = 400;
      break;

    case "DataNotFound":
      message = "Pet not found";
      statusCode = 404;
      break;

    case "Forbidden":
      statusCode = 403;
      message = "You are not authorized to do this action";
      break;

    case "JsonWebTokenError":
      message = "You need to login before accessing even further";
      statusCode = 401;
      break;

    case "SyntaxError":
      message = "You need to login before accessing even further";
      statusCode = 401;
      break;

    case "Unauthorized":
      message = "Invalid email or password";
      statusCode = 401;
      break;

    case "EmailRequired":
      statusCode = 400;
      message = "Email is required";
      break;

    case "PasswordRequired":
      statusCode = 400;
      message = "Password is required";
      break;

    case "SequelizeUniqueConstraintError":
      statusCode = 400;
      message = error.errors[0].message;
      break;

    case "SequelizeValidationError":
      statusCode = 400;
      const errorMapping = error.errors.map((el) => {
        return el.message;
      });

      if (errorMapping.length === 1) {
        message = errorMapping[0];
      } else {
        message = errorMapping;
      }
      break;

    default:
      break;
  }

  response.status(statusCode).json({
    message,
  });
}

module.exports = errorHandler;
