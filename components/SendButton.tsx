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
  const [count, setCount] = useState(0);
  const closeHandler = () => setModalOpen(false);
  const handleTextarea = (e: any) => {
    setNewData({...newData, content : e.target.value })
    setCount(e.target.value.length);
}
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
                <select onChange={handleAuthorChange} name="authorId">
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
              <label>
              Point options
              <select  onChange={handleChange} name="points">
                <option value="">Choose points</option>
                <option value="villager">Villager Points</option>
                <option value="explorer">Explorer Points</option>
              </select>
              </label>
              <label>
              Points
              <select  onChange={handleChange} name="points">
                <option value="">Choose points</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              </label>
            </div>
            <div>
              <label>Content <span style={{"color": "grey"}}>( {count}</span> / 500 )</label>
              <textarea id="content" name="content" value={newData.content} onChange={handleTextarea} maxLength={500}></textarea>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  );
}

export default SendButton;
