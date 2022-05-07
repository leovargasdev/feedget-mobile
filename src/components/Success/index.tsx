import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from './styles'
import successImage from '../../assets/success.png'

interface SuccessProps {
  onSendAnotherFeedback: () => void
}

export const Success = ({ onSendAnotherFeedback }: SuccessProps) => {
  return (
    <View style={styles.container}>
      <Image  source={successImage} style={styles.image} />

      <Text style={styles.title}>
        Agradecemos o feedback
      </Text>

      <TouchableOpacity style={styles.button} onPress={onSendAnotherFeedback}>
        <Text style={styles.buttonText}>
          Quero enviar outro
        </Text>
      </TouchableOpacity>
    </View>
  )
}