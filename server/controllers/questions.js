module.exports = {
    refresh: ( req, res, next ) => {
        req.app.get('db').queries.getAllQuestionsForSession()
        .then(data => res.status(200).send(data))
        .catch(err => { res.status(500).send(err)})   
    },

    add: ( req, res, next ) => {
        console.log("add thing hit in module exports");
        const { questiontext , class_session_id } = req.body
        req.app.get('db').queries.recordNewTeacherQuestion([questiontext, class_session_id]);
        next();
    }
};