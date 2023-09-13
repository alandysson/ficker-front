import { Input, Image } from "antd";
import "./styles.scss";

const SearchField = () => {
    return(
        <Input
            placeholder="Pesquisar..."
            prefix={<Image src="/icons/icon-search.svg" alt="icon-search" width={25} height={25} />}
            className="searchField"
        />
    )
}

export default SearchField;