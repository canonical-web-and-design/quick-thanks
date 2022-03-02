import { useState } from "react";
import { Modal } from "@canonical/react-components"
import { RecognitionProps } from "./Recognition";

const SendButton = ({ users }) => {
  const [newData, setNewData] = useState<Partial<RecognitionProps>>({
    title: "",
    author: { fullName: ""},
    recipient:  {fullName: ""},
    content:"",
    published : true
  });

  const [modalOpen, setModalOpen] = useState(false);

  const closeHandler = () => setModalOpen(false);
  const handleSendButton =  () => {
    // postRecognition(newData);
    // const recognition = await prisma.recognition.create({
    //     data: newData
    //   });
      // res.status(200).json(recognition);
  }

  const handleChange = (e: any) => {
    setNewData({...newData, [e.target.name] : e.target.value })
  }
  const handleAuthorChange = (e: any) => {
    const name = e.target.name
    setNewData({...newData, [e.target.name]: { fullname: e.target.value }})
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

export default SendButton;
