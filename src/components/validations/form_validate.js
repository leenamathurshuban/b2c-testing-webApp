export default function validate(values) {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email address is required';
    }else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }else if (!values.serial_number) {
        errors.serial_number = 'Serial Number is required';
    }
    return errors;
};