import { Box, Center, Flex, Text } from '@chakra-ui/react'
import CardButton from '../../../components/CardButton/CardButton'

interface CreateSlideProps {
  loading: boolean;
  handleOpenPicker: () => void;
  createNewGoogleSlide: () => void;
}

const CreateSlide: React.FC<CreateSlideProps> = ({
  loading,
  handleOpenPicker,
  createNewGoogleSlide
}) => {
  return (
    <Box width="full" mt="12%">
      <Center display="flex" alignItems="center" justifyContent="center">
        <Box
          py={5}
          px={5}
          width="36%"
          height="34%"
          border="1px"
          borderColor="blackAlpha.300"
          borderRadius={8}
        >
          <Flex flexDirection="column" gap={4}>
            <Flex flexDirection="column" gap={3}>
              <Text fontWeight="medium">2. Select presentation template</Text>
              <Text fontWeight="medium">Describe what role the presentation template plays ni this whole thing.</Text>
            </Flex>

            <Flex gap={2} width="full" height="full">
              <CardButton
                title="Start from an existing presentation"
                handleClick={() => handleOpenPicker()}
              />

              <CardButton
                loading={loading}
                title="Create a new Google Slides presentation"
                handleClick={() => createNewGoogleSlide()}
              />
            </Flex>
          </Flex>
        </Box>
      </Center>
    </Box>
  )
}

export default CreateSlide