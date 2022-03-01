import { useState } from "react";
import { Modal } from "@canonical/react-components"

const SendButton = ({ users }) => {

  const [modalOpen, setModalOpen] = useState(false);

  const closeHandler = () => setModalOpen(false);

  const handleSendButton = () => {
    
  }

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Send appreciation</button>
      {modalOpen ? (
        <Modal
          title="Send appreciation"
          buttonRow={
            <>
              <button className="u-no-margin--bottom">Send</button>
              <button
                className="p-button--negative u-no-margin--bottom"
                onClick={closeHandler}
              >
                Cancel
              </button>
            </>
          }
        >
          <form>
            <div>
              <label>Receiver:</label>
              <select>
                <option value="">choose name</option>
                {users.map((user) => (
                  <option value={user.launchpadName}>{user.fullName}</option>
                ))}
              </select>
              <label>Author:</label>
              <select>
                {users.map((user) => (
                  <option value={user.launchpadName}>{user.fullName}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Content:</label>
              <textarea id="content"> </textarea>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  );
}
export default SendButton