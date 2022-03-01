import { useState } from "react";
import { Modal } from "@canonical/react-components"
import prisma from '../lib/prisma'
import { PostProps } from "./Post";
import { postRecognition } from "../pages/api/recognitions";
const SendButton =() => {
  const [newData, setNewData] = useState<PostProps>({
    title: "",
    author: { fullName: ""},
    recipient:  {fullName: ""},
    content:"",
    published : true
  });
  const [modalOpen, setModalOpen] = useState(false);

  const closeHandler = () => setModalOpen(false);
  const handleSendButton =  () =>{
    postRecognition(newData)
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
  console.log(newData)
  return <>
          <button onClick={() => setModalOpen(true)}>Send appreation</button>
          {modalOpen ? <Modal title="Send appreation" buttonRow={<>
            <button className="u-no-margin--bottom" onClick={handleSendButton}>
              Send
            </button>
            <button className="p-button--negative u-no-margin--bottom" onClick={closeHandler}>
              Cancel
            </button>
          </>}>
            <form>
              <div>
                <label> Title</label>
                <input name="title" value={newData.title} onChange={handleChange}/>
              </div>
              <div>
                <label>Receiver:</label>
                <select name="recipient" value={newData.recipient.fullName} onChange={handleAuthorChange}>
                  <option value="">choose name</option>
                  <option value="min">Min</option>
                  <option value="andrue">Andreu</option>
                  <option value="peter">Peter</option>
                  <option value="lydia">Lydia</option>
                  <option value="dave">Dave</option>
                </select>
                <label>Author:</label>
                <select name="author" value={newData.author.fullName} onChange={handleAuthorChange}>
                  <option value="">choose name</option>
                  <option value="min">Min</option>
                  <option value="andrue">Andreu</option>
                  <option value="peter">Peter</option>
                  <option value="lydia">Lydia</option>
                  <option value="dave">Dave</option>
                </select>
              </div>
              <div>
                <label>Content:</label>
                <textarea id="content" name="content" value={newData.content} onChange={handleChange}> </textarea>
              </div>
            </form>

          </Modal> : null}
        </>;
}
export default SendButton