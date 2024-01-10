import { Box, Text } from '@chakra-ui/react';
import { IoArrowForwardOutline } from "react-icons/io5";

/* Application Modules */
import Button from '../CustomBtn/Button';

interface CardButtonProps {
  loading?: boolean
  title: string;
  handleClick: () => void;
}

const CardButton: React.FC<CardButtonProps> = ({ title, loading, handleClick }) => {
  return (
    <Box
      py={2}
      px={2}
      bg="gray.400"
      width="50%"
      height="70%"
      borderRadius={5}
      onClick={handleClick}
      _hover={{ cursor: "pointer" }}
    >
      <Text>{title}</Text>
      <Box display="flex" justifyContent="flex-end">
        <Button
          bg="black"
          leftIcon={<IoArrowForwardOutline color="white" />}
          _hover={{ bg: "black" }}
          isLoading={loading}
        />
      </Box>
    </Box>
  )
}

export default CardButton;