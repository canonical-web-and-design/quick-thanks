import { useState } from "react";
import { Modal, RadioInput, Card, Button } from "@canonical/react-components";
import { RecognitionProps } from "./Recognition";

const SendButton = ({ user, users, session }) => {
  const initialValue = {
    recipientId: -1,
    content: "",
    published: true,
  };
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [newData, setNewData] =
    useState<Partial<RecognitionProps>>(initialValue);
  const [modalOpen, setModalOpen] = useState(false);
  const closeHandler = () => setModalOpen(false);
  const handleTextarea = (e: any) => {
    setNewData({ ...newData, content: e.target.value });
    setCount(e.target.value.length);
  };
  const handleSendButton = async () => {
    try {
      if (
        newData.recipientId === -1 ||
        newData.content.length < 1
      ) {
        alert("Check all the inputs");
        return;
      }
      const res = await fetch("/api/recognitions", {
        method: "POST",
        body: JSON.stringify({ authorId: session.user.id, ...newData }),
      });
      const status = await res.status;
      if (status === 200) {
        alert("Submitted");
        setNewData(initialValue);
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleChange = (e: any) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleAuthorChange = (e: any) => {
    setNewData({ ...newData, [e.target.name]: +e.target.value });
  };
  const handleNextPage = () =>{
    if(page !== 4){
      setPage(page + 1)
    }
  }
  const handlePreviousPage = () =>{
    if(page !== 1){
      setPage(page - 1)
    }
  }

  const handleTitle = ()=>{
    switch (page) {
      case 1:
        return "What kind of thanks do you want to send?"
      case 2:
        return "How many points do you want to award? (2/4)"
      case 3:
        return "Write your message (3/4)"
      default:
        break;
    }
  }
  return (
    <>
      <button className="p-button--brand" onClick={() => setModalOpen(true)}>
        Send Thanks
      </button>
      {modalOpen ? (
        <Modal
          close={closeHandler}
          title={handleTitle()}
          buttonRow={
            <>
              {page !== 1 && <Button className="u-no-margin--bottom" onClick={handlePreviousPage}>Back</Button>}
              {page !== 3 && <Button className="u-no-margin--bottom" appearance="positive" onClick={handleNextPage}>Next</Button>}
              {page === 3 && <Button
                appearance="positive"
                className="u-no-margin--bottom"
                onClick={handleSendButton}
              >
                Send
              </Button>}
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
           {page === 1 && 
           <div>
            <div>
              <label>
                <h5>To</h5>
                <select onChange={handleAuthorChange} name="recipientId">
                  <option value="">choose name</option>
                  {users.map((person) => {
                   if(person.name !== user.name ){
                    return (<option key={person.id} value={person.id}>
                      {person.name}
                    </option>)
                   }
                  })}
                </select>
              </label>
            </div>
            <div>
              <h5> Thanks Type </h5>
                <div>
                  <RadioInput label="" onChange={handleChange} name="points" default/>
                  <Card title="Send Quick Thanks">
                    Send a personalised thank you card to a colleague
                  </Card>
                </div>
                <div>
                  <RadioInput label="" onChange={handleChange} name="points"/>
                  <Card title="Send Thanks with Villager points">
                    Send a personalised thank you card to a colleague
                  </Card>
                </div>
                <div>
                  <RadioInput label="" onChange={handleChange} name="points"/>
                  <Card title="Send Thanks with Explorer points">
                    Send a personalised thank you card to a colleague
                  </Card>
                </div>
              </div>
            </div>}
            {page === 2 && <div>
              <h5><span> 30 </span> Villager points left to award</h5>
              <div> 
                <div>
                  <RadioInput label="" onChange={handleChange} name="points"/>
                  <Card title="5">
                    Villager points
                  </Card>
                </div>
                <div>
                  <RadioInput label="" onChange={handleChange} name="points"/>
                  <Card title="10">
                    Villager points
                  </Card>
                </div>
                <div>
                  <RadioInput label="" onChange={handleChange} name="points"/>
                  <Card title="20">
                    Villager points
                  </Card>
                </div>
                <div style={{"margin" : "20px"}}>You'll have 15 villager points left to award before 10th March 2022.</div>
              </div>
            </div>}
            {page === 3 && <div>
              <label>
                Content <span style={{ color: "grey" }}>( {count}</span> / 500 )
              </label>
              <textarea
                id="content"
                name="content"
                value={newData.content}
                onChange={handleTextarea}
                maxLength={500}
              ></textarea>
            </div>
            }
          </form>
        </Modal>
      ) : null}
    </>
  );
};

export default SendButton;
