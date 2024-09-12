export const defaultPhotoUrl = (name) => `https://api.dicebear.com/9.x/pixel-art/svg?seed=${name}`
export const userTypes = {
    ADMIN: 'admin',
    USER: 'user',
}

export const requiredFields = [
    { field: 'firstName', type: 'String', required: true, message: 'First name is required' },
    { field: 'lastName', type: 'String', required: true, message: 'Last name is required' },
    { field: 'username', type: 'String', required: true, message: 'Username is required' },
    { field: 'email', type: 'String', required: true, message: 'Email is required' },
    { field: 'dateOfBirth', type: 'Date', required: true, message: 'Date of birth is required' },
    { field: 'password', type: 'String', required: true, message: 'Password is required' },
    { field: 'mobile', type: 'String', required: false, message: 'Mobile is required' },
]
