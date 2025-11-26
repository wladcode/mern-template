import { Container } from "@mui/material";
import styled from '@emotion/styled'

export const ContainerApp = styled(Container)`
    height: 100vh;

    /* grid container settings */
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header"
        "main"
        "footer";

    header {
        grid-area: header;
    }

    main {
        grid-area: main;
        //overflow: auto;
        //padding: 15px 5px 10px 5px;
        //padding-bottom: 10px;
    }

    footer {
        grid-area: footer;
    }
`;
