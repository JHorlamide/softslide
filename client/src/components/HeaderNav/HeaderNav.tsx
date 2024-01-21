/* Libraries */
import { Box } from "@chakra-ui/react"

/* Application Modules */
import { useAuthHeader } from "../../hooks/useAuthHeader";
import AuthenticatedUserHeader from "../AuthenticatedUserHeader/AuthenticatedUserHeader";
import UnAuthenticatedUserHeader from "../UnAuthenticatedUserHeader/UnAuthenticatedUserHeader";

const HeaderNav = () => {
  const { isTokenExist, onSubmit } = useAuthHeader();

  return (
    <Box
      py={3}
      px={8}
      width="full"
      bg="gray.200"
      display="flex"
      justifyContent="flex-end"
    >
      <Box>
        {isTokenExist ? (
          <AuthenticatedUserHeader />
        ) : (
          <UnAuthenticatedUserHeader submit={onSubmit} />
        )
        }
      </Box >
    </Box>
  )
}

export default HeaderNav