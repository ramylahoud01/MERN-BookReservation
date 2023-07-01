import {createBrowserRouter,RouterProvider} from "react-router-dom"
import BookFormPages from './Components/Pages/BookFormPages';
import BookViewPages from "./Components/Pages/BookViewPages";
import { loader as BookViewLoader } from "./Components/Pages/BookViewPages";

function App() {
  const router = createBrowserRouter([
    {path:'/',element: <BookFormPages />},
    {path:'/view/book',element:<BookViewPages />,loader:BookViewLoader}
  ])
  return <RouterProvider router={router} />
}

export default App;
