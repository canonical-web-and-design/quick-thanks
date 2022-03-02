import { useState } from "react";
import { Modal } from "@canonical/react-components"
import { RecognitionProps } from "./Recognition";

const SendButton = ({ users }) => {
  const [newData, setNewData] = useState<Partial<RecognitionProps>>({
    authorId: -1,
    recipientId: -1,
    content:"",
    published : true
  });
  const [modalOpen, setModalOpen] = useState(false);

  const closeHandler = () => setModalOpen(false);

  const handleSendButton =  async () => {
        const res = await fetch('api/recognitions', {
          method: 'POST',
          body: JSON.stringify(newData),
        });
        const data = await res.json();
        console.log(data)
      };

  const handleChange = (e: any) => {
    setNewData({...newData, [e.target.name] : e.target.value })
  }
  const handleAuthorChange = (e: any) => {
    setNewData({...newData, [e.target.name]: +e.target.value})
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
              <button className="u-no-margin--bottom" onClick={handleSendButton}>Send</button>
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
                <select  onChange={handleAuthorChange} name="authorId">
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.fullName}</option>
                  ))}
                </select>
              </label>
              <label>
                To
                <select onChange={handleAuthorChange} name="recipientId">
                  <option value="">choose name</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.fullName}</option>
                  ))}
                  </select>
              </label>
            </div>
            <div>
              <label>Content</label>
              <textarea id="content" name="content" value={newData.content} onChange={handleChange}> </textarea>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  );
}

export default SendButton;
