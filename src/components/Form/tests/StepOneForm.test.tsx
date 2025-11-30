import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';
import StepOneForm from '../StepOneForm';
import type { FormDataValues } from '../../../types/formValues';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../../../common/form/FormField', () => {
  return jest.fn(({ name, label }) => (
    <div data-testid={`form-field-${name}`}>
      <label>{label}</label>
    </div>
  ));
});

const TestWrapper = () => {
  const { control } = useForm<FormDataValues>();
  return <StepOneForm control={control} />;
};

describe('StepOneForm Component', () => {
  it('should render all form fields with correct names', () => {
    render(<TestWrapper />);
    
    const expectedFields = [
      'name',
      'nationalId',
      'dob',
      'gender',
      'address',
      'city',
      'state',
      'country',
      'phone',
      'email',
    ];
    
    expectedFields.forEach((fieldName) => {
      expect(screen.getByTestId(`form-field-${fieldName}`)).toBeInTheDocument();
    });
  });

  it('should render form with vertical layout', () => {
    const { container } = render(<TestWrapper />);
    const formElement = container.querySelector('.ant-form-vertical');
    
    expect(formElement).toBeInTheDocument();
  });
});