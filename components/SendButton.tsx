import { useState } from "react";
import { Modal, RadioInput, Card, Button, Row, Col } from "@canonical/react-components";
import { RecognitionProps } from "./Recognition";

const SendButton = ({ user, users, session }) => {
  const initialPointvalue = {
    receivedExplorerPoints: 0,
    receivedVillagerPoints: 0,
    remainingExplorerPointsToGive: 0,
    remainingVillagerPointsToGive: 0, 
  }
  const initialValue = {
    recipientId: -1,
    content: "",
    published: true,
  };
  const [points, setPoints] = useState({pointName: "none", pointValue: 0})
  console.log(points)
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [newData, setNewData] =
    useState<Partial<RecognitionProps>>(initialValue);
  const [modalOpen, setModalOpen] = useState(false);
  const closeHandler = () => { setModalOpen(false); setPage(1); setCount(0); setNewData(initialValue); };

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
        setPage(4);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePointChange = (e : any) => {
    if(e.target.name === "pointName"){
      setPoints({...points, [e.target.name]: e.target.value })
    }else if (e.target.name === "pointValue"){
      setPoints({...points, [e.target.name]: +e.target.value })
    }
  }
  const handleAuthorChange = (e: any) => {
    setNewData({ ...newData, [e.target.name]: +e.target.value });
  };
  const handleNextPage = () =>{
    if(page === 1 && points.pointName ==="none"){
      setPage(3)
    }
    else if(page === 3){
      return
    }else{
      setPage(page + 1)
    }
  }
  const handlePreviousPage = () =>{
    if(page === 3 && points.pointName ==="none"){
      setPage(1)
    }else if(page === 1){
      return
    }else {
      setPage(page - 1)
    }
  }

  const handleTitle = ()=>{
    switch (page) {
      case 1:
        return "What kind of thanks do you want to send?"
      case 2:
        return "How many points do you want to award?"
      case 3:
        return "Write your message"
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
              {page !== 1 && page !== 4 && (
                <Button
                  className="u-no-margin--bottom"
                  onClick={handlePreviousPage}
                >
                  Back
                </Button>
              )}
              {page < 3 && (
                <Button
                  className="u-no-margin--bottom"
                  appearance="positive"
                  onClick={handleNextPage}
                >
                  Next
                </Button>
              )}
              {page === 3 && (
                <Button
                  appearance="positive"
                  className="u-no-margin--bottom"
                  onClick={handleSendButton}
                >
                  Send
                </Button>
              )}
              <button
                className={`p-button${
                  page === 4 ? "" : "--negative"
                } u-no-margin--bottom`}
                onClick={closeHandler}
              >
                {page === 4 ? "Close" : "Cancel"}
              </button>
            </>
          }
        >
          <form>
            {page === 1 && (
              <div>
                <div>
                  <label>
                    <h5>To</h5>
                    <select onChange={handleAuthorChange} name="recipientId">
                      <option value="">choose name</option>
                      {users.map((person) => {
                        if (person.name !== user.name) {
                          return (
                            <option key={person.id} value={person.id}>
                              {person.name}
                            </option>
                          );
                        }
                      })}
                    </select>
                  </label>
                </div>
                <div>
                  <h5> Thanks Type </h5>
                  <Row>
                    <Col size={4}>
                      <div className="p-card">
                        <label style={{ height: "14rem" }}>
                          <RadioInput
                            label=""
                            onChange={handlePointChange}
                            name="pointName"
                            value="none"
                            default
                          />
                          <h3 className="p-card__title">Send Quick Thanks</h3>
                          <div className="p-card__content">
                            Send a personalised thank you card to a colleague
                          </div>
                        </label>
                      </div>
                    </Col>
                    <Col size={4}>
                      <div className="p-card">
                        <label style={{ height: "14rem" }}>
                          <RadioInput
                            label=""
                            onChange={handlePointChange}
                            name="pointName"
                            value="villager"
                          />
                          <h3 className="p-card__title">
                            Send Thanks with Villager points
                          </h3>
                          <div className="p-card__content">
                            Send a personalised thank you card to a colleague
                          </div>
                        </label>
                      </div>
                    </Col>
                    <Col size={4}>
                      <div className="p-card">
                        <label style={{ height: "14rem" }}>
                          <RadioInput
                            label=""
                            onChange={handlePointChange}
                            name="pointName"
                            value="explorer"
                          />
                          <h3 className="p-card__title">
                            Send Thanks with Explorer points
                          </h3>
                          <div className="p-card__content">
                            Send a personalised thank you card to a colleague
                          </div>
                        </label>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            )}
            {page === 2 && points.pointName !== "none" && (
              <div>
                <h5>
                  <span> 30 </span> {points.pointName} points left to award
                </h5>
                <div>
                  <div>
                    <RadioInput
                      label=""
                      onChange={handlePointChange}
                      name="pointValue"
                      value={5}
                    />
                    <Card title="5">{points.pointName} points</Card>
                  </div>
                  <div>
                    <RadioInput
                      label=""
                      onChange={handlePointChange}
                      name="pointValue"
                      value={10}
                    />
                    <Card title="10">{points.pointName} points</Card>
                  </div>
                  <div>
                    <RadioInput
                      label=""
                      onChange={handlePointChange}
                      name="pointValue"
                      value={20}
                    />
                    <Card title="20">{points.pointName} points</Card>
                  </div>
                  <div style={{ margin: "20px" }}>
                    You'll have 15 {points.pointName} points left to award
                    before 10th March 2022.
                  </div>
                </div>
              </div>
            )}
            {page === 3 && (
              <div>
                <label>
                  Content <span style={{ color: "grey" }}>( {count}</span> / 500
                  )
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={newData.content}
                  onChange={handleTextarea}
                  maxLength={500}
                  style={{ minHeight: "200px" }}
                ></textarea>
              </div>
            )}
          </form>
          {page === 4 && (
            <div className="p-strip" style={{ width: "25rem" }}>
              <h2>Sent</h2>
              <p>Your card is on it's way.</p>
            </div>
          )}
        </Modal>
      ) : null}
    </>
  );
};

export default SendButton;
