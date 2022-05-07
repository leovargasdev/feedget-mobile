import { View, Text } from 'react-native'

import styles from './styles'

import { Option } from '../Option'
import { FeedbackType } from '../Widget'
import { Copyright } from '../Copyright'
import { feedbackTypes } from '../../utils/feedbackTypes'

interface OptionsProps {
  changeFeedbackType: (value: FeedbackType) => void
}

export const Options = ({ changeFeedbackType }: OptionsProps) => (
  <View style={styles.container}>

    <Text style={styles.title}>
      Deixe seu feedback
    </Text>

    <View style={styles.options}>
      {Object.entries(feedbackTypes).map(([key, value]) => (
        <Option
          key={key}
          {...value}
          onPress={() => changeFeedbackType(key as FeedbackType)}
        />
      ))}
    </View>
    <Copyright />
  </View>
)