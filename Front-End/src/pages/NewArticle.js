import { useState } from 'react';
import axios from 'axios';

const NewArticle = () => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !title || !content) {
            setMessage('Todos os campos são obrigatórios.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/articles', {
                name,
                title,
                content,
            });
            setMessage('Artigo cadastrado com sucesso!');
            setName('');
            setTitle('');
            setContent('');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Erro ao cadastrar o artigo.');
        }
    };

    return (
        <div>
            <h2>Cadastrar Artigo</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Conteúdo</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Cadastrar Artigo</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default NewArticle;
