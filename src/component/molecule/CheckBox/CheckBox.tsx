import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Text} from '../../atom';
// import { Box, Text } from '@/component/atom';
import icon from '@/constants/icon';
import {
  controlsCheckboxInactive,
  controlsCheckboxSelected,
  controlsCheckboxUnchecked,
} from '@/style-dictionary-dist/momoStyle';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: () => void;
}
const CheckBox = ({
  label,
  disabled,
  checked,
  onChange = () => {},
}: CheckboxProps) => {
  const {CheckIcon, EmptyCheckIcon, DisabledcheckIcon, DisabledemptycheckIcon} =
    icon;

  let Ikon;

  switch (checked) {
    case true:
      Ikon = disabled ? (
        <DisabledcheckIcon color={controlsCheckboxUnchecked} />
      ) : (
        <CheckIcon color={controlsCheckboxSelected} />
      );
      break;
    case false:
      Ikon = disabled ? (
        <DisabledemptycheckIcon color={controlsCheckboxInactive} />
      ) : (
        <EmptyCheckIcon color={controlsCheckboxUnchecked} />
      );
      break;

    default:
      break;
  }
  return (
    // <BorderlessButton
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        if (disabled) return;
        onChange();
      }}
      style={{justifyContent: 'center'}}>
      <Box flexDirection="row" gap={'hsm'} alignItems={'center'}>
        {/* <Box
          height={20}
          width={20}
          marginRight="s"
          alignItems="center"
          justifyContent="center"
          borderRadius={4}
          borderWidth={checked ? 0 : 2}
          style={{
            borderColor: disabled
              ? controlsCheckboxInactive
              : controlsCheckboxUnchecked,
            backgroundColor: checked
              ? disabled
                ? controlsCheckboxUnchecked
                : controlsCheckboxSelected
              : 'white',
          }}>
          {checked && <Icon name="check" color="white" size={16} />}
        </Box> */}
        {Ikon}
        <Text
          fontSize={16}
          lineHeight={24}
          style={{
            fontFamily: 'MTNBrighterSans-Regular',
            color: '#5F5F5F',
          }}>
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default CheckBox;
