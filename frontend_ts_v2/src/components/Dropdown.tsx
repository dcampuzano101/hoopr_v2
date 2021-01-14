import React, { useState } from 'react'
import { Typography, Paper, Button, Card } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

interface Option {
  path: string
  title: string
  subTitle: string
}

interface DropdownProps {
  options: Option[]
  name: string
}

const useStyles = makeStyles(({ palette }: Theme) => ({
  dropdownWrapper: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    },
    position: 'relative'
  },
  optionsWrapper: {
    position: 'absolute',
    display: 'none',
    top: '30px',
    flexDirection: 'column',
    width: '150%'
  },
  show: {
    display: 'flex'
  },
  optionWrap: {}
}))

const Dropdown: React.FC<DropdownProps> = ({ options, name }) => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <div
      className={classes.dropdownWrapper}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Typography variant="body2">{name}</Typography>
      <Card
        raised={true}
        className={`${classes.optionsWrapper} ${isOpen ? classes.show : ''}`}
      >
        {options.map((option) => (
          <div className={classes.optionWrap}>
            <Typography variant="body2">{option.title}</Typography>
            <Typography variant="subtitle1">{option.subTitle}</Typography>
          </div>
        ))}
      </Card>
      {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
    </div>
  )
}

export default Dropdown
