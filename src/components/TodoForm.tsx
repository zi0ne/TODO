import React, { useState } from "react";
import "./component.css"

//TodoFormProps 인터페이스정의 : 입력받을 값은 문자열임을 알려줌
export interface TodoFormProps {
  onAdd: (text: string) => void;
}

//TodoForm은 리액트 함수 컴포넌트,TodoFormProps 타입의 onAdd 를 인자로 받아서 사용할 것
// text의 디폴트는 빈문자이고, handleSubmit을 이용해 이벤트 객체를 받아
//preventDefalut()로 바로제출되는 이벤트를 막고
//입력된 text가 비어있지 않다면 onAdd 호출하고 text를 초기화시킨다
const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      return;
    }
    onAdd(text);
    setText("");
  };

  // input과button(헤더부분) 요소를 렌더링 onChange 이벤트 핸들러를사용하여 입력값이 변할 때 text 상태 업데이트
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button className="button">Add</button>
    </form>
  );
};

export default TodoForm;
