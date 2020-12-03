export default {
    getAll() {
        return firebase.firestore().collection('articles').get();
    },
    create(data) {
        return firebase.firestore().collection('articles').add(data);
    },
    get(id){
        return firebase.firestore().collection('articles').doc(id).get();
    },
    update(id,data){
        return firebase.firestore().collection('articles').doc(id).update(data);
    },
    close(id){
        return firebase.firestore().collection('articles').doc(id).delete();
    }
};