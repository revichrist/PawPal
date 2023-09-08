async function adminAuthorization(request, response, next){
  try {

    const {isAdmin} = request.user

    if(!isAdmin){
      throw {name: 'Forbidden'}
    }else{
      next()
    }
    
  } catch (error) {
    next(error)
  }
}

module.exports = adminAuthorization