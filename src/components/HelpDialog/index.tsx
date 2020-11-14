import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import React from 'react'

import { Reason } from '#src/types'

import helpTexts from './help-texts'

type Props = {
  open: boolean
  onClose: () => void
  title: string
  reason: Reason | null
}

const HelpDialog = ({ open, onClose, title, reason }: Props) => {
  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {reason && (
          <Typography align="justify" variant="body1">
            {helpTexts[reason]}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default HelpDialog

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})
