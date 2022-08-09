import { PhoneBookForm } from 'components/PhoneBookForm/PhoneBookForm';
import { Section } from 'components/Section/Section.styled';
import { Box } from 'components/Box/Box.styled';
import { Title } from 'components/Title/Title.styled';
import { PhonesList } from 'components/PhonesList/PhonesList';
import { Filter } from 'components/Filter/Filter';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { remove } from 'redux/itemsSlice';
import { addFilter } from 'redux/filterSlice';

export default function App() {
  const items = useSelector(state => state.items);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const changeFilter = e => {
    const filter = e.currentTarget.value;
    dispatch(addFilter(filter));
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLocaleLowerCase();

    return items.items.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter)
    );
  };
  const deleteContact = id => {
    dispatch(remove(id));
  };

  return (
    <Section>
      <Title>Phonebook</Title>
      <Box>
        <PhoneBookForm />
      </Box>
      <Title>Contacts</Title>
      <Box>
        <Filter value={filter} onChange={changeFilter} />
        <PhonesList
          options={getVisibleContacts()}
          deleteContact={deleteContact}
        />
      </Box>
    </Section>
  );
}
