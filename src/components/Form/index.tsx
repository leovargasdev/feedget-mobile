import { useState } from 'react'
import { ArrowLeft } from 'phosphor-react-native'
import { 
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'
import * as ExpoFileSystem from 'expo-file-system'
import { captureScreen } from 'react-native-view-shot'

import { Button } from '../Button'
import { FeedbackType } from '../Widget'
import { ScreenshotButton } from '../ScreenshotButton'

import styles from './styles'
import { theme } from '../../theme'
import { api } from '../../services/api'
import { feedbackTypes } from '../../utils/feedbackTypes'

interface FormProps {
  feedbackType: FeedbackType
  onFeedbackCanceled: () => void
  onFeedbackSend: () => void
}

export const Form = ({ feedbackType, onFeedbackCanceled, onFeedbackSend }:FormProps) => {
  const feedbackTypeInfo = feedbackTypes[feedbackType]
  const [screenshot, setScreenshot] = useState<string | null>(null)
  
  const [comment, setComment] = useState<string>('aaaaa')
  const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false)

  const handleScreenshot = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
    .then( uri => setScreenshot(uri))
    .catch(err => console.log(err))
  }

  const handleScreenshotRemove = () => setScreenshot(null)

  const createNewFeedback = async () => {
    if(isSendingFeedback) return;
    
    setIsSendingFeedback(true)
    const screenshotBase64 = screenshot && await ExpoFileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })

    try {
      await api.post('/feedbacks', {
        comment,
        type: feedbackType,
        screenshot: `data:image/png;base64, ${screenshotBase64}`,
      })
      setIsSendingFeedback(false)
      onFeedbackSend()
    } catch(err) {
      console.log(err)
    }
  }
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        autoCorrect={false}
        style={styles.input}
        onChangeText={setComment}
        placeholder="Texto do input"
        defaultValue={comment}
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
        />

        <Button isLoading={isSendingFeedback} onPress={createNewFeedback} />
      </View>
    </View>
  )
}