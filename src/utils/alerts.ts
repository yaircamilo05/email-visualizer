import Swal from 'sweetalert2';

export const showWarningAlert = (title: string, text: string) => {
  Swal.fire({
    icon: 'warning',
    title: title,
    text: text,
    background: '#ffffff',
    iconColor: '#856404'
  });
};

export const showErrorAlert = (title: string, text: string) => {
  Swal.fire({
    icon: 'error',
    title: title,
    text: text,
    background: '#ffffff',
    iconColor: '#ff0000'
  });
};