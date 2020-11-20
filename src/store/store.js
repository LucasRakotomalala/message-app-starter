import {createStore} from "vuex";
import {contactsModule} from "@/store/contacts.store";
import {messagesModule} from "@/store/messages.store";
import {errorsModule} from "@/store/errors.store";
import {authModule} from "@/store/auth.store";

export const store = createStore({
	modules: {
		auth: authModule,
		contacts: contactsModule,
		messages: messagesModule,
		errors: errorsModule,
	}
});
