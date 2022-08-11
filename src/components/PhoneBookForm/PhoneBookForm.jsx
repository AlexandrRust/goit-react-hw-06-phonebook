import { Formik, ErrorMessage } from 'formik';
import { PhoneForm, Input } from './PhoneBookForm.styled';
import { Label } from 'components/common/Label/Label.styled';
import { FirstButton } from 'components/common/buttons/FirstButton.styled';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { add } from 'redux/contactsSlice';
import { useDispatch } from 'react-redux/es/exports';

const schema = yup.object().shape({
  name: yup.string().min(3).required(),
  number: yup.string().min(13).required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const PhoneBookForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    dispatch(add({ id: nanoid(), name, number }));
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <PhoneForm autoComplete="off">
        <Label htmlFor="name">
          Name
          <Input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" />
        </Label>
        <Label htmlFor="name">
          Phone
          <Input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <ErrorMessage name="number" />
        </Label>
        <FirstButton type="submit">Add Contact</FirstButton>
      </PhoneForm>
    </Formik>
  );
};
