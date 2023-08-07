type NavbarProps = {
    page: string;
    changePage: (page: string) => void;
};

const Navbar = ({ page, changePage }: NavbarProps) => {
    return (
        <div>
        <h1>Navbar</h1>
        </div>
    );
};

export default Navbar;