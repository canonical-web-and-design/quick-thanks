import { useState } from "react";
import { Modal } from "@canonical/react-components"
const SendButton =() => {

  const [modalOpen, setModalOpen] = useState(false);

  const closeHandler = () => setModalOpen(false);

  return <>
          <button onClick={() => setModalOpen(true)}>Send appreation</button>
          {modalOpen ? <Modal title="Send appreation" buttonRow={<>
            <button className="u-no-margin--bottom" >
              Send
            </button>
            <button className="p-button--negative u-no-margin--bottom" onClick={closeHandler}>
              Cancel
            </button>
          </>}>
            <form>
              <div>
                <select>
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
                <textarea id="content"> </textarea>
              </div>
            </form>

          </Modal> : null}
        </>;
}
export default SendButton