import styled from 'styled-components';
import {useRef} from 'react';
import domtoimage from 'dom-to-image';
import Github from '../../assets/github.svg?react';


interface IProps {
    className?: string
}

const Banner = ({
    className,
}: IProps) => {
    const ref = useRef();


    const downloadBanner = () => {
        const node = document.getElementById('my-node');
        if(!node){
            return;
        }

        domtoimage.toPng(node, {quality: 0.95})
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'og.png';
                link.href = dataUrl;
                link.click();
            });
    };


    const repositoryUrl = 'https://github.com/acrool/acrool-react-hooks';
    const name = 'Acrool React Hooks';


    return <BannerRoot className={className}>
        <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
            <Github width={40} height={40}/>
        </a>
        <DownloadButton type="button" onClick={downloadBanner}>Download Banner</DownloadButton>

        <div className="banner-wrapper" id="my-node">
            <img src="/logo.svg" alt={name}/>
            <h1>{name}</h1>
        </div>
    </BannerRoot>;
};

export default Banner;



const DownloadButton = styled.button`
    position: absolute;
  right: 0;
`;


const BannerRoot = styled.div`
  position: relative;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
