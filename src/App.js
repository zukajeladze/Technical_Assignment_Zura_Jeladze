import styled from "styled-components";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const onChangeHandler = (event) => {
    setText(event.target.value);
    if (event.target.value.length > 0) {
      setVisible(true);
      setisLoading(true);
      fetch(`https://api.github.com/search/users?q=${event.target.value}`)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          alert(error);
        });
      setTimeout(() => {
        setisLoading(false);
      }, 500);
    } else if (event.target.value.length < 1) {
      setVisible(false);
    }
  };
  const openProfile = (url) => {
    window.open(url);
  };

  console.log(data);
  console.log(isLoading);

  return (
    <Container>
      <InputContainer>
        <Input
          type="text"
          name="search"
          label="Search"
          placeholder=" Enter Github account"
          value={text}
          onChange={onChangeHandler}
        ></Input>
        <Results disp={visible}>
          {isLoading && <Loading>Loading... </Loading>}
          {data.items && data.items.length === 0 && (
            <Loading>No results found</Loading>
          )}
          {data.items &&
            data.items.length > 0 &&
            !isLoading &&
            [...data.items].map((item, index) => {
              return (
                <Item key={index} onClick={() => openProfile(item.html_url)}>
                  <img
                    alt="avatar"
                    style={{ height: "50px", borderRadius: "100%" }}
                    src={item.avatar_url}
                  ></img>{" "}
                  <p>{item.login}</p>
                </Item>
              );
            })}
        </Results>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  height: 400px;
  width: 400px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  gap: 2px;
  display: grid;
  grid-template-rows: 20% 1fr;
  border-radius: 5px;
`;

const Input = styled.input`
  height: 30px;
  width: 90%;
  padding: 0;
  margin: auto;
  margin-top: 20px;
  padding: 3px;
  border-radius: 3px;
  .no-outline:focus {
    outline: none;
  }
`;

const Results = styled.div`
  height: 90%;
  width: 100%;
  bottom: -2px;
  /* border: 1px solid green; */
  display: ${(props) => (props.disp ? "flex" : "none")};
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 1em;
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  height: auto;
  padding: 4px 10px 4px 4px;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #ccc;
  }
  p {
    margin-left: 2em;
  }
`;

const Loading = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  img {
    height: 5px;
    width: 5px;
  }
`;

export default App;
