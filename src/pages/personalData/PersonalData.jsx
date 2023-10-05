import React, { useEffect, useState } from 'react';
import './PersonalData.scss';
import back from '../../assets/back.png';
import edit from '../../assets/edit.png';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setUserLogged } from '../../redux/store/auth/authReducer';
import { auth, fireStore } from '../../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import fileUpload from '../../service/fileUpload';
import Loading from '../../components/loading/Loading';

const PersonalData = () => {
    const navigate = useNavigate();
    const userLogged = useSelector((state) => state.auth.userLogged);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState({
        displayName: '',
        email: '',
        phoneNumber: '',
        address: '',
    });
    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        if (userLogged) {
            const getUserDataFromFirestore = async () => {
                try {
                    if (userLogged && userLogged.id) {
                        const userDocRef = doc(fireStore, 'users', userLogged.id);
                        const userDocSnapshot = await getDoc(userDocRef);
                        if (userDocSnapshot.exists()) {
                            const userData = userDocSnapshot.data();
                            setEditedUserData(userData);
                        }
                    }
                } catch (error) {
                    console.error('Error al obtener datos de Firestore:', error);
                }
            };

            getUserDataFromFirestore();
        }
    }, [userLogged]);

    const handleEdit = (field) => {
        setIsEditing(true);
        setEditingField(field);
    };

    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const imageUrl = await fileUpload(file);
                if (userLogged && userLogged.id) {
                    const userDocRef = doc(fireStore, 'users', userLogged.id);
                    await updateDoc(userDocRef, { photoURL: imageUrl });
                    dispatch(setUserLogged({
                        ...userLogged,
                        photoURL: imageUrl,
                    }));
                }
            } catch (error) {
                console.error('Error al actualizar la foto de perfil:', error);
            }
        }
    };
    const handleSave = async (e) => {
        e.preventDefault();

        if (userLogged && userLogged.id) {
            try {
                const userDocRef = doc(fireStore, 'users', userLogged.id);
                const updatedFields = {};
                if (editingField === 'displayName') {
                    updatedFields.displayName = editedUserData.displayName;
                }
                if (editingField === 'phoneNumber') {
                    updatedFields.phoneNumber = editedUserData.phoneNumber;
                }
                if (editingField === 'address') {
                    updatedFields.address = editedUserData.address;
                }

                await updateDoc(userDocRef, updatedFields);

                dispatch(
                    setUserLogged({
                        ...userLogged,
                        [editingField]: editedUserData[editingField],
                    })
                );

                setIsEditing(false);
                setEditingField(null);
            } catch (error) {
                console.error('Error al actualizar la información en Firestore:', error);
            }
        }
    };

    if (!userLogged) {
        return (
            <div>
                <Loading/>
            </div>
        );
    }

    return (
        <div className='personal relative flex flex-col items-center'>
            <div className='container__login'>
            <img
                        className='backArrow back '
                        onClick={() => navigate(-1)}
                        src={back}
                        alt=''
                    />
                    <div>
                        <h1>DATOS PERSONALES</h1>
                    </div>
                <div className='w-20 h-20 rounded-full overflow-hidden'>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleProfilePictureChange}
                        id="profilePictureInput"
                    />
                    <label htmlFor="profilePictureInput">
                        <img
                            src={userLogged.photoURL}
                            alt='Foto de perfil'
                            className='w-full h-full object-cover cursor-pointer'
                        />
                      </label>
                </div>
                <div className='flex flex-col gap-8 p-10'>
                    {isEditing && editingField === 'displayName' ? (
                        <form>
                            <input
                                type='text'
                                value={editedUserData.displayName}
                                onChange={(e) =>
                                    setEditedUserData({
                                        ...editedUserData,
                                        displayName: e.target.value,
                                    })
                                }
                            />
                            <button type='submit' onClick={handleSave}>Guardar</button>
                        </form>
                    ) : (
                        <div className='flex justify-between w-72'>
                            <div className='flex gap-2'>
                                <p className='fontGreen'>Nombre:</p>
                                {isEditing && editingField === 'displayName' ? (
                                    <input
                                        type='text'
                                        value={editedUserData.displayName}
                                        onChange={(e) =>
                                            setEditedUserData({
                                                ...editedUserData,
                                                displayName: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <p>{userLogged.displayName}</p>
                                )}
                            </div>
                            {isEditing && editingField === 'displayName' ? (
                                <button type='submit' onClick={handleSave}>Guardar</button>
                            ) : (
                                <img
                                    className='w-4 object-contain cursor-pointer'
                                    src={edit}
                                    alt=''
                                    onClick={() => handleEdit('displayName')}
                                />
                            )}
                        </div>
                    )}
                    <hr />
                    <div className='flex justify-between w-72'>
                        <div className='flex gap-2'>
                            <p className='fontGreen' >Correo:</p>
                            <p>{userLogged.email}</p>
                        </div>
                    </div>
                    <hr />
                    {isEditing && editingField === 'phoneNumber' ? (
                        <form>
                            <input
                                type='tel'
                                value={editedUserData.phoneNumber}
                                onChange={(e) =>
                                    setEditedUserData({
                                        ...editedUserData,
                                        phoneNumber: e.target.value,
                                    })
                                }
                            />
                            <button type='submit' onClick={handleSave}>Guardar</button>
                        </form>
                    ) : (
                        <div className='flex justify-between w-72'>
                            <div className='flex gap-2'>
                                <p className='fontGreen' >Celular:</p>
                                {isEditing && editingField === 'phoneNumber' ? (
                                    <input
                                        type='tel'
                                        value={editedUserData.phoneNumber}
                                        onChange={(e) =>
                                            setEditedUserData({
                                                ...editedUserData,
                                                phoneNumber: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <p>{userLogged.phoneNumber}</p>
                                )}
                            </div>
                            {isEditing && editingField === 'phoneNumber' ? (
                                <button type='submit' onClick={handleSave}>Guardar</button>
                            ) : (
                                <img
                                    className='w-4 object-contain cursor-pointer'
                                    src={edit}
                                    alt=''
                                    onClick={() => handleEdit('phoneNumber')}
                                />
                            )}
                        </div>
                    )}
                    <hr />
                    {isEditing && editingField === 'address' ? (
                        <form>
                            <input
                                type='text'
                                value={editedUserData.address}
                                onChange={(e) =>
                                    setEditedUserData({
                                        ...editedUserData,
                                        address: e.target.value,
                                    })
                                }
                            />
                            <button type='submit' onClick={handleSave}>Guardar</button>
                        </form>
                    ) : (
                        <div className='flex justify-between w-72'>
                            <div className='flex gap-2'>
                                <p className='fontGreen'>Dirección:</p>
                                {isEditing && editingField === 'address' ? (
                                    <input
                                        type='text'
                                        value={editedUserData.address}
                                        onChange={(e) =>
                                            setEditedUserData({
                                                ...editedUserData,
                                                address: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <p>{userLogged.address}</p>
                                )}
                            </div>
                            {isEditing && editingField === 'address' ? (
                                <button type='submit' onClick={handleSave}>Guardar</button>
                            ) : (
                                <img
                                    className='w-4 object-contain cursor-pointer'
                                    src={edit}
                                    alt=''
                                    onClick={() => handleEdit('address')}
                                />
                            )}
                        </div>
                    )}
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default PersonalData;
