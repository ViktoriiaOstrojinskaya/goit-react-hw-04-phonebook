import PropTypes from 'prop-types';
import { FilterInput } from './Filter.styled';

export const Filter = ({ value, onChange }) => (
  <label>
    Find contacts by name
    <FilterInput type="text" value={value} onChange={onChange} />
  </label>
);

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
