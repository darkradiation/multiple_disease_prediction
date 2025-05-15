import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { HiChevronDown } from 'react-icons/hi2';
import { MdCancel } from "react-icons/md";
const StyledSelectBox = styled.div`
  width: 50rem;
  position: relative;
`;

const Label = styled.label`
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.2rem;
  display: block;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  width: 100%;
`;

const DropdownIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-grey-500);
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-top: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 15rem;
  overflow-y: auto;
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 0.8rem 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const SelectedSymptomsContainer = styled.div`
  margin-top: 1rem;
`;

const SelectedSymptom = styled.span`
  background-color: var(--color-brand-100); /* Use background-color for the symptom pill */
  color: var(--color-brand-700);
  padding: 0.4rem 0.8rem;
  border-radius: var(--border-radius-sm);
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  position: relative; /* Make it a relative container for absolute positioning */
  padding-right: 1.8rem; /* Add padding to the right to make space for the icon */
  align-items: center;
`;

const RemoveButton = styled.button`
 background: none;
 border: none;
 cursor: pointer;
 padding: 0 0.5rem;
  display: flex;
  align-items: center;
  color: var(--color-brand-700);
  position: absolute; /* Position the button absolutely */
  top: 0; /* Align to the top right */
  right: 0;
  height: 100%; /* Make it take the full height of the parent */
`;


const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
  display: block;
  margin-top: 0.5rem;
`;

function SelectBox({ label, options, error, selectedSymptoms, onSelectSymptom, onRemoveSymptom }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectBoxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectBoxRef.current && !selectBoxRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectBoxRef]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleSelectItem = (item) => {
    onSelectSymptom(item);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSymptoms.includes(option)
  );

  return (
    <StyledSelectBox ref={selectBoxRef}>
      {label && <Label>{label}</Label>}
      <InputContainer>
        <Input
          type="text"
          placeholder="Search symptoms..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsDropdownOpen(true)}
        />
        <DropdownIcon>
          <HiChevronDown />
        </DropdownIcon>
      </InputContainer>

      {isDropdownOpen && filteredOptions.length > 0 && (
        <Dropdown>
          {filteredOptions.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSelectItem(option)}>
              {option}
            </DropdownItem>
          ))}
        </Dropdown>
      )}

      {selectedSymptoms.length > 0 && (
        <SelectedSymptomsContainer>
          {selectedSymptoms.map((symptom, index) => (
            <SelectedSymptom key={index}>
              {symptom}  
              <RemoveButton onClick={() => onRemoveSymptom(symptom)}>  <MdCancel size={14} /></RemoveButton> {/* Add the remove button */}
            </SelectedSymptom>
          ))}
        </SelectedSymptomsContainer>
      )}

      {error && <Error>{error}</Error>}
    </StyledSelectBox>
  );
}

export default SelectBox;