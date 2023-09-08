const router = require("express").Router();
const { authentication, adminAuthorization, upload } = require("../middlewares");
const { PetController } = require("../controllers");

router.get("/", PetController.fetchReadyPet);
router.get('/randomFacts', PetController.fetchRandomDogFact)
router.get('/detail/:id', PetController.fetchPetDetail)

router.use(authentication);

router.post("/", upload.single('image'), PetController.postPet);
router.get("/admin", adminAuthorization, PetController.fetchAdminPet);
router.patch("/:id", adminAuthorization, PetController.patchStatus);
router.delete("/:id", adminAuthorization, PetController.deletePet);
router.post("/adopt/:petId", PetController.adoptPet);

module.exports = router;
