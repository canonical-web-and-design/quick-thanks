import { useState } from "react";
import { Modal } from "@canonical/react-components"

const SendButton = ({ users }) => {

  const [modalOpen, setModalOpen] = useState(false);

  const closeHandler = () => setModalOpen(false);

  const handleSendButton = () => {
    
  }

  return (
    <>
      <button onClick={() => setModalOpen(true)}>Send Quick Thanks</button>
      {modalOpen ? (
        <Modal
          close={closeHandler}
          title="Send Quick Thanks"
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
              <label>
                From
                <select>
                  {users.map((user) => (
                    <option value={user.launchpadName}>{user.fullName}</option>
                  ))}
                </select>
              </label>
              <label>
                To
                <select>
                  <option value="">choose name</option>
                  {users.map((user) => (
                    <option value={user.launchpadName}>{user.fullName}</option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label>Quick Thanks</label>
              <textarea id="content"> </textarea>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  );
}
export default SendButton