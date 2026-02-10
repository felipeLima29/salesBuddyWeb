import { useEffect, useRef } from 'react';
import icPersonBlue from '../assets/icPersonBlue.svg';
import ButtonEditUser from '../components/buttons/buttonsEditUser';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import InputUser from '../components/inputs/inputUser';
import { useUser } from '../hooks/useUser';
import { formatCNPJ } from '../utils/formatters';

function AddNewUser() {
    const { create, loading } = useUser();

    const trys = useRef(0);
    const validateSchema = Yup.object({
        usuario: Yup.string().required('Usuário é obrigatório.'),
        nome: Yup.string().required('Nome é obrigatório.'),
        email: Yup.string()
        .email('Formato de e-mail inválido.')
        .required('E-mail é obrigatório.'),
        empresa: Yup.string().required('Empresa é obrigatório.'),
        cnpj: Yup.string().required('CNPJ é obrigatório.')
    });

    const formik = useFormik({
        initialValues: {
            usuario: '',
            nome: '',
            email: '',
            empresa: '',
            cnpj: ''
        },
        validationSchema: validateSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await create(
                    values.usuario,
                    values.nome,
                    values.email,
                    values.empresa,
                    values.cnpj
                );

                toast.success(response.message || "Usuário cadastrado com sucesso!");
                resetForm();
                trys.current = 0;
            } catch (error) {
                toast.error(error.message || "Erro ao cadastrar.");
            }
        }
    });
    useEffect(() => {
        if (formik.submitCount > trys.current) {
            trys.current = formik.submitCount;

            if (!formik.isValid) {
                const primeiroErro = Object.values(formik.errors)[0];
                if (primeiroErro) {
                    toast.error(primeiroErro);
                }
            }
        }
    }, [formik.submitCount, formik.isValid, formik.errors]);


    return (
        <div className="body">
            <div className="container">
                <div className='headerImg'>
                    <img src={icPersonBlue} alt="Pessoa Icon" />
                    <h3>CADASTRAR NOVO USUÁRIO</h3>
                </div>

                <form className='formAddUser'>
                    <div className='divAddUser'>
                        <label htmlFor="USUÁRIOS" className='txViewInfo'>USUÁRIO</label>
                        <InputUser
                            name='usuario'
                            className='inputAddUser'
                            value={formik.values.usuario}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="NOME" className='txViewInfo'>NOME</label>
                        <InputUser
                            name='nome'
                            className='inputAddUser'
                            value={formik.values.nome}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="E-MAIL" className='txViewInfo'>E-MAIL</label>
                        <InputUser
                            name='email'
                            className='inputAddUser'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="EMPRESA" className='txViewInfo'>EMPRESA</label>
                        <InputUser
                            name='empresa'
                            className='inputAddUser'
                            value={formik.values.empresa}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className='divAddUser'>
                        <label htmlFor="CNPJ" className='txViewInfo'>CNPJ</label>
                        <InputUser
                            name='cnpj'
                            className='inputAddUser'
                            value={formik.values.cnpj}
                            maxLength="18"
                            onChange={(e) => {
                                const masked = formatCNPJ(e.target.value);
                                formik.setFieldValue('cnpj', masked);
                            } }
                        />
                    </div>
                </form>

                <ButtonEditUser
                    loading={loading}
                    onSave={formik.handleSubmit}
                    onReset={formik.handleReset}
                    classNameTxSave='txActiveUser'
                    classNameButtonSave='buttonActiveUser'
                    classNameTxReset='txInactiveUser'
                    classNameButtonreset='buttonInactiveUser'
                />

            </div>


        </div>
    )

}

export default AddNewUser;