import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  ChakraProvider,
  FormControl,
  Flex,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Text,
  theme,
  Divider,
  IconButton,
} from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import axios from "axios"

delete theme.styles.global

function Todo() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const [todos, setTodos] = useState([])

  async function handleSubmit(e) {
    e.preventDefault()

    const title = e.target.title.value
    const body = e.target.body.value

    const res = axios
      .post("http://localhost:5050/todo", { title, body })
      .then((res) => {
        setTitle("")
        setBody("")
        setTimeout(() => {
          window.location.href = "http://localhost:5173/todo"
        }, 100)
      })
  }

  useEffect(() => {
    axios
      .get("http://localhost:5050/todos")
      .then((response) => {
        setTodos(response.data)
      })
      .catch((error) => {
        console.log("Error fetching the todos", error)
      })
  }, [])

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:5050/todo/${todoId}`)
      const res = await axios.get("http://localhost:5050/todos")
      setTodos(res.data)
    } catch (error) {
      console.log("Error deleting the todo", error)
    }
  }

  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <Flex mt="30px" ml="80px" fontFamily="Poppins">
        <Box>
          <Heading fontSize="30px" textDecor="underline">
            Todo-List
          </Heading>
          <Box maxW="700px">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Enter Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  maxW="150px"
                  mb="25px"
                  onChange={(e) => {
                    setTitle(e.target.value)
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Enter Body</FormLabel>
                <Textarea
                  type="text"
                  name="body"
                  maxW="250px"
                  onChange={(e) => {
                    setBody(e.target.value)
                  }}
                ></Textarea>
              </FormControl>
              <Button
                mt="20px"
                type="submit"
                colorScheme="purple"
                border="none"
                cursor="pointer"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Box>
        <Box ml="400px" p="10px" flex="1" maxW="500px">
          <Box>
            {todos.map((todo) => (
              <Box key={todo._id}>
                <Text>Title : {todo.title}</Text>
                <Text>Paragarph : {todo.body}</Text>
                <IconButton
                  colorScheme="red"
                  cursor="pointer"
                  border="0px"
                  icon={<CloseIcon />}
                  onClick={() => {
                    handleDeleteTodo(todo._id)
                  }}
                />
                <hr />
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>
    </ChakraProvider>
  )
}

export default Todo
