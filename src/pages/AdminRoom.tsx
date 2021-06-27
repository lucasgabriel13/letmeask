import { useHistory, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import exitImg from '../assets/images/exit.svg';
import { Button } from './../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from './../components/Question';
import { useRoom } from './../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg';
import { database } from '../services/firebase';
import { toast, Toaster } from 'react-hot-toast';

import "../styles/room.scss";

type RoomParams = {
  id: string;
}

export function AdminRoom() {

  //const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory();

  const { questions, title } = useRoom(roomId);

  function clickToaster() {
    toast((t) => (
      <span>
        Deseja encerrar a sala?
        <button onClick={() => handleEndRoom()} style={{background: "transparent", border: "0", color:"#835afd", marginLeft:"10px", cursor: "pointer", fontSize:"18px"}}>
          <b>Sim</b>
        </button>
      </span >
    ));
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })
    toast.dismiss();
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAsnwered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  return (
    <div id="page-room">
      <Toaster />
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <div className="buttonExit">
              <Button isOutlined onClick={clickToaster}>Encerrar Sala</Button>
            </div>
            <img className="exit" src={exitImg} alt="sair" onClick={clickToaster} />
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAsnwered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta com respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque `a pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}