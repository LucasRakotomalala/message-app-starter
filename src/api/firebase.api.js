import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"
import {firebaseConfig} from "@/api/firebase.credentials";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const database = firebase.database();
const messagesRef = database.ref('/messages');
const contactsRef = database.ref('/members');

export {
	auth,
	messagesRef,
	contactsRef
}
