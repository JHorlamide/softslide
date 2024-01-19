/* Libraries */
import { FcGoogle } from "react-icons/fc";

/* Application Modules */
import Button from "../CustomBtn/Button"

const UnAuthenticatedUserHeader = ({ submit }: { submit: () => void }) => {
  return (
    <Button
      color="black"
      bg="white"
      width="auto"
      type="submit"
      border="1px"
      borderColor="blackAlpha.500"
      _hover={{ bg: "white.200" }}
      leftIcon={<FcGoogle />}
      onClick={submit}
    >
      Sign In
    </Button>
  )
}

export default UnAuthenticatedUserHeader