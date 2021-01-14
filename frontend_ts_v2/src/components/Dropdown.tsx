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
    top: '35px',
    flexDirection: 'column',
    width: '150%',
    border: '1px solid black'
  },
  show: {
    display: 'flex'
  },
  optionWrap: {},

  dropdownUp: {
    top: 'calc(-.5rem + 2.3rem)',
    left: '1.30rem',
    width: '10px',
    height: '10px',
    position: 'absolute',
    transform: 'rotate(225deg)',
    borderBottom: '1px solid black',
    borderRight: '1px solid black',
    zIndex: 10000,
    backgroundColor: 'white'
  }
}))
// ${isOpen ? classes.showArrow : ''}

const Dropdown: React.FC<DropdownProps> = ({ options, name }) => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      className={classes.dropdownWrapper}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Typography variant="body2">{name}</Typography>
      <div
        className={classes.dropdownUp}
        style={{ display: isOpen ? 'block' : 'none' }}
      ></div>
      <Card
        raised={true}
        className={`${classes.optionsWrapper} ${isOpen ? classes.show : ''}`}
      >
        {options.map((option, idx) => (
          <div key={idx} className={classes.optionWrap}>
            <Typography variant="body2">{option.title}</Typography>
            <Typography variant="subtitle1">{option.subTitle}</Typography>
          </div>
        ))}
      </Card>
      <ArrowDropDown />
    </div>
  )
}

export default Dropdown
