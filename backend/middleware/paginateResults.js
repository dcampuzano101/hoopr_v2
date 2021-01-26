// totally using Web Dev Simplified's tutorial as a reference, there will be some changes
// to satisfy my API requests / Use Cases / Business Logic

function paginatedResults(model) {
  return async (req, res, next) => {
    console.log(req)
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    // console.log(next)
    next()
    try {
      results.results = await model
        .find()
        .limit(limit)
        .skip(startIndex)
        .select('-password')
        .exec()
      res.paginatedResults = results
      //   next()
    } catch (error) {
      res.status(500).json({ message: error.message })
      throw new Error('Problem returning paginated results')
    }
  }
}

export default paginatedResults
