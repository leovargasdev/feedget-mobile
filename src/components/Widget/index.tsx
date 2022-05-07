import { useRef, useState } from "react"
import BottomSheet  from '@gorhom/bottom-sheet'
import { TouchableOpacity } from "react-native"
import { ChatTeardropDots } from 'phosphor-react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { Form } from "../Form"
import { Success } from "../Success"
import { Options } from "../Options"
import { feedbackTypes } from '../../utils/feedbackTypes'

import styles from './styles'
import { theme } from "../../theme"

export type FeedbackType = keyof typeof feedbackTypes

const Widget = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSend, setFeedbackSend] = useState<boolean>(false)

  const handleOpen = () => {
    bottomSheetRef.current?.expand()
  }

  const handleRestartFeedback = () => {
    setFeedbackType(null)
    setFeedbackSend(false)
  }

  const handleFeedbackSend = () => setFeedbackSend(true)

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />

      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSend ?
          <Success onSendAnotherFeedback={handleRestartFeedback} />
        :
          <>
            {feedbackType ? 
              <Form
                feedbackType={feedbackType}
                onFeedbackSend={handleFeedbackSend}
                onFeedbackCanceled={handleRestartFeedback}
              />
            :
              <Options changeFeedbackType={setFeedbackType} />}
          </>  
        }
        
      </BottomSheet>
    </>
  )
}

export default gestureHandlerRootHOC(Widget)