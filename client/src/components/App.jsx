import Login from "./Login";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../store/ContactsProvider";
import { ConversationsProvider } from "../store/ConversationsProvider";
import { SocketProvider } from "../store/SocketProvider";

function App() {
  // id state is placeed here because it will be shared across the entire application
  const [id, setId] = useLocalStorage("id");

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return <>{id ? dashboard : <Login onIdSubmit={setId} />}</>;
}

export default App;
