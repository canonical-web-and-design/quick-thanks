import { useState } from "react";
import { Modal } from "@canonical/react-components"
import { RecognitionProps } from "./Recognition";

const SendButton = ({ users }) => {
  const initialValue = {
    authorId: -1,
    recipientId: -1,
    content:"",
    published : true
  }
  const [newData, setNewData] = useState<Partial<RecognitionProps>>(initialValue);
  const [modalOpen, setModalOpen] = useState(false);

  const closeHandler = () => setModalOpen(false);

  const handleSendButton =  async () => {
    try {
      if( newData.authorId === -1 || newData.recipientId === -1 || newData.content.length < 1 ){
        alert("Check all the inputs")
        return;
      } 
      const res = await fetch('api/recognitions', {
        method: 'POST',
        body: JSON.stringify(newData),
      });
      const status = await res.status
      if(status === 200) {
        alert("Submitted")
        setNewData(initialValue)
        setModalOpen(false);
      }
    } catch(err){
      console.error(err);
    }
  }
  const handleChange = (e: any) => {
    setNewData({...newData, [e.target.name] : e.target.value })
  }
  const handleAuthorChange = (e: any) => {
    setNewData({...newData, [e.target.name]: +e.target.value})
  }

  return (
    <>
      <button className="p-button is-dark" onClick={() => setModalOpen(true)}>
        Send Quick Thanks
      </button>
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
                  <option value="">choose name</option>
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
