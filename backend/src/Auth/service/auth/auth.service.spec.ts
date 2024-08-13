import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../../../User/serivce/user/user.service'
describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                secret: 'testSecret',
                signOptions: { expiresIn: '60m' },
                }),
            ],
        providers: [AuthService, UserService],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    //test validateUser method
    it('should return user if login data are OK', () => {
        const user = { username: 'alex', password: 'Alex1240..', posts:[] };
        const result = service.validateUser(user);
        expect(result).toEqual(user);
    });

    //
    it('should return JWT-token', ()=>{
        const user = { username: 'alex', password: 'Alex1240..', posts:[] };
        const token=service.generateToken(user);
        expect(typeof token).toBe('string');
    });

    it('should validate JWT-token', ()=>{
        const user = { username: 'alex', password: 'Alex1240..', posts:[] };
        const token=service.generateToken(user);
        expect(typeof token).toBe('string');
        expect(service.validateToken(token).username).toEqual("alex");
    });


});
