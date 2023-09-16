import "./styles.scss";
import { useEffect, useState } from "react";
import { request } from "@/service/api";
import { ModalNewCategory } from "../ModalNewCategory";

interface AmountByCategory {
    category_description : string,
    amount : number
}

const MyCategoriesList = () => {
    const [categories, setCategories] = useState<AmountByCategory[]>([]); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getCategories = async () => {
        try {
            const response = await request({
                method: 'GET',
                endpoint: '/'
            });
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    }

    const colorPalette = ['#5B48D4', '#D47E72', '#B168D4', '#D4C148', '#53D495', '#3A2E87', '#D49A72', '#51D448', '#3A8735', ];

    useEffect(() => {
        //getCategories();
        setCategories([
            {
              category_description: 'Categoria 1',
              amount: 100,
            },
            {
              category_description: 'Categoria 2',
              amount: 200,
            },
            {
              category_description: 'Categoria 3',
              amount: 150,
            },
            {
              category_description: 'Categoria 4',
              amount: 300,
            },
          ])
    })

    return (
        <div className="card">
            <div className="title-area"> 
                <h4>Minhas Categorias</h4>
                <a className="title-area__button" onClick={showModal}>
                    <img src="/icons/icon-more.svg" alt="new_category" />
                </a>
            </div>
            <ModalNewCategory isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <div className="categories-area">
                {categories?.map((category, index) => (
                    <div className="category-area">
                        <div className="category-area__infos">
                            <span style={{background: colorPalette[index % colorPalette.length]}} className="circle"></span>
                            <div className="category-area__description">
                                {category.category_description}
                            </div>
                        </div>
                        <div className="category-area__value">
                            R${category.amount}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyCategoriesList;