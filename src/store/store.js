import {createStore} from "vuex";
import {contactsModule} from "@/store/contacts.store";
import {messagesModule} from "@/store/messages.store";
import {errorsModule} from "@/store/errors.store";

export const store = createStore({
	modules: {
		contacts: contactsModule,
		messages: messagesModule,
		errors: errorsModule,
	}
});
